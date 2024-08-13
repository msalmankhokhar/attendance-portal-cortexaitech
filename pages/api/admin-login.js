// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middlewares/db";
import Admin from "@/models/Admin";
import Designation from '@/models/Designation';
import Company from '@/models/Company'

async function handler(req, res) {
  const response = { success: true }
  if (req.method == 'POST') {
    const { email, password } = req.body
    try {
      
    } catch (error) {
      response.success = false
      response.msg = "Something went wrong"
      response.error = error
      res.status(500).json(response)
    }
  } else {
    response.success = false
    response.msg = "Only accepts POST request"
    res.status(403).json(response)
  }
}

export default connectDB(handler)