const { Users } = require('../models/users');

/**
 * Fetch new users count, and daily new users
 */
async function fetchNewUsers() {
    const now = new Date();

    // ✅ Step 1: Get the first day of this week (Sunday)
    const firstDayOfWeek = new Date(now);
    firstDayOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay()); // Move to Sunday
    firstDayOfWeek.setUTCHours(0, 0, 0, 0);

    console.log("First Day of Week (UTC):", firstDayOfWeek.toISOString());
    console.log("Now (Current Day UTC):", now.toISOString());

    // ✅ Step 2: Fetch user data from MongoDB, grouping by **full date (YYYY-MM-DD)**
    const result = await Users.aggregate([
        { 
            $match: { createdAt: { $gte: firstDayOfWeek, $lte: now } } 
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by full date
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id": 1 } } // Sort by date
    ]);

    console.log("MongoDB Aggregation Result:", result);

    // ✅ Step 3: Convert MongoDB result into a Map for quick lookups
    const userCountsByDate = new Map(result.map(d => [d._id, d.count]));

    // ✅ Step 4: Generate the final daily counts from Sunday to Today
    const dailyCounts = [];
    for (let i = 0; i <= now.getUTCDay(); i++) { // ✅ Loops from Sunday (0) to Today
        const date = new Date(firstDayOfWeek);
        date.setUTCDate(firstDayOfWeek.getUTCDate() + i);
        
        const formattedDate = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
        console.log("Checking Date:", formattedDate); // Debug log

        dailyCounts.push(userCountsByDate.get(formattedDate) || 0); // Push count or 0 if no users
    }

    console.log("Final Daily Data:", dailyCounts);

    return {
        totalNewUsers: dailyCounts.reduce((sum, count) => sum + count, 0), // ✅ Total users this week
        dailyData: dailyCounts // ✅ Final array of user counts from Sunday → Today
    };
}


/**
 * Fetch total users, active users, and suspended users count
 */
async function fetchTotalUsers() {
    const result = await Users.aggregate([
        {
            $group: {
                _id: null,
                totalUsers: { $sum: 1 },
                activeUsers: {
                    $sum: { $cond: [{ $eq: ["$state", "active"] }, 1, 0] }
                },
                suspendedUsers: {
                    $sum: { $cond: [{ $eq: ["$state", "suspended"] }, 1, 0] }
                }
            }
        }
    ]);

    return result.length > 0 ? result[0] : { totalUsers: 0, activeUsers: 0, suspendedUsers: 0 };
}

/**
 * Fetch the count of users based on their roles (admin, user, etc.)
 */
async function fetchUserRoles() {
    const result = await Users.aggregate([
        {
            $group: {
                _id: null,
                normalUsers: {
                    $sum: { $cond: [{ $eq: ["$privilege", "user"] }, 1, 0] }
                },
                admins: {
                    $sum: { $cond: [{ $eq: ["$privilege", "admin"] }, 1, 0] }
                }
            }
        }
    ]);

    return result.length > 0 ? result[0] : { normalUsers: 0, admins: 0, moderators: 0 };
}

/**
 * Fetch users info
 */
function fetchUsers(filter_fields, projection_fields={}, sort={reports: -1}){
    return Users.find(filter_fields, projection_fields).sort(sort);
}

/**
 * Controller: Handle the users page request
 */
async function handleGetUsersPage(req, res) {
    let users_filter_fields = req?.query?.cursor ? {_id: {$gt: req.query.cursor}} : {};
    try {
        // Run all queries in parallel
        const [totalUsers, newUsers, userRoles, users] = await Promise.all([
            fetchTotalUsers(),
            fetchNewUsers(),
            fetchUserRoles(),
            fetchUsers(users_filter_fields)
        ]);
        let cursor = users.length >= 15 ? users[users.length - 1]._id : null;
        // console.log(users)

        // console.log({
        //     totalUsers,
        //     newUsers: {
        //         totalThisWeek: newUsers.totalNewUsers,
        //         daily: newUsers.dailyData
        //     },
        //     userRoles
        // });

        res.render('users', { user: req?.user, users, cursor, totalUsers, newUsers, userRoles });

    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { handleGetUsersPage };
