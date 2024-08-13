// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middlewares/db";
import Admin from "@/models/Admin";
import Designation from '@/models/Designation';
import Company from '@/models/Company'

async function handler(req, res) {
  const response = { success: true }
  if (req.method == 'POST') {
    const { name, email, password, company, designation } = req.body
    try {
      const newAdmin = new Admin({ name, email, password })
      
      // If the input company already exists in database, then dont create a new company otherwise make a new company and assign it to the admin
      const companyAlreadyInDatabase = await Company.findOne({ title: company })
      let newCompany
      if (companyAlreadyInDatabase) {
        newAdmin.company = companyAlreadyInDatabase
        console.log("company already in db", companyAlreadyInDatabase.title);
      } else {
        console.log("making new company");
        newCompany = new Company({ title: company })
        await newCompany.save()
        newAdmin.company = newCompany
      }

      // Checking wether its a designation in the request body, because its optional for Admin
      if (designation) {
        // If the input designation already exists in database, then dont create a new designation otherwise make a new designation and assign it to the admin
        const designationAlreadyInDatabase = await Designation.findOne({ title: designation })
        if (designationAlreadyInDatabase) {
          newAdmin.designation = designationAlreadyInDatabase
        } else {
          const newDesignation = new Designation({ title: designation, company: newAdmin.company })
          await newDesignation.save()
          newAdmin.designation = newDesignation
        }
      }

      await newAdmin.save()
      res.status(200).json({
        ...response,
        msg: `${name} successfully signed up as an Admin for ${company}`,
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