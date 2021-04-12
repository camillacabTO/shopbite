import mongoose from 'mongoose'

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    })
    console.log(`MongoDB connected to ${connection.host}`)
  } catch (error) {
    console.error(error.message)
  }
}

export default connectToDB
