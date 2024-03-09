const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://koushikbug123:ZOqH9ENmzMXjF8NT@cluster0.ynwcsj3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient
const client = new MongoClient(uri);

// Main function to connect to the database
async function main() {
  try {
    await client.connect();
    console.log("Connected to the database");

    const database = client.db("student_records");

    // Define collections
    const academicRecordsCollection = database.collection("academic_records");
    const coCurricularActivitiesCollection = database.collection(
      "co_curricular_activities"
    );

    console.log("Collections created successfully");

    // Sample data for academic records collection
    const academicRecordsData = [
      {
        student_id: "001",
        name: "John Doe",
        grades: [{ subject: "Math", grade: "A" }],
      },
      // Add more academic records
    ];

    // Sample data for co-curricular activities collection
    const coCurricularActivitiesData = [
      {
        student_id: "001",
        name: "John Doe",
        activity_type: "Sports",
        duration: "1 year",
        achievements: "Won championship",
      },
      // Add more co-curricular activities
    ];

    // Insert sample data into collections
    await academicRecordsCollection.insertMany(academicRecordsData);
    await coCurricularActivitiesCollection.insertMany(
      coCurricularActivitiesData
    );

    // Retrieve all academic records
    const allAcademicRecords = await academicRecordsCollection.find().toArray();
    console.log("All academic records:", allAcademicRecords);

    // Update academic record
    await academicRecordsCollection.updateOne(
      { student_id: "001" },
      { $set: { "grades.$[element].grade": "B" } },
      { arrayFilters: [{ "element.subject": "Science" }] }
    );

    // Delete co-curricular activity
    await coCurricularActivitiesCollection.deleteOne({
      student_id: "001",
      activity_type: "Sports",
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the connection after performing operations
    await client.close();
  }
}

// Call the main function to connect and perform database operations
main();
