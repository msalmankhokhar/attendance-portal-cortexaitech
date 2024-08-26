// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middlewares/db";
import Admin from "@/models/Admin";
import Role from '@/models/Role';

async function handler(req, res) {
  const response = { success: true }
  if (req.method == 'POST') {
    const { name, email, password, role } = req.body
    try {
      const newAdmin = new Admin({ name, email, password })

      // Checking wether its a role in the request body, because its optional for Admin
      if (role) {
        // If the input role already exists in database, then dont create a new role otherwise make a new role and assign it to the admin
        const roleAlreadyInDatabase = await Role.findOne({ title: role })
        if (roleAlreadyInDatabase) {
          newAdmin.role = roleAlreadyInDatabase
        } else {
          const newRole = new Role({ title: role })
          await newRole.save()
          newAdmin.role = newRole
        }
      }

      await newAdmin.save()
      res.status(200).json({
        ...response,
        msg: `${name} successfully signed up as an Admin`,
        "added in database": newAdmin
      })
    } catch (error) {
      response.success = false
      response.msg = "Failed to add in database"
      response.error = error
      res.status(500).json(response)
    }
  } else {
    response.success = false
    res.status(403).json({ ...response, msg: "Only accepts POST request" })
  }
}

export default connectDB(handler)