require('express-async-errors');
const express = require('express');
const app = express();
const port = 3000;
const PatientRoutes = require("./routes/PatientRoutes");
const DoctorRoutes = require("./routes/DoctorRoutes");
const AppointmentRoutes = require("./routes/AppointmentRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const cors = require("cors");
app.use(cors({origin: '*'}));
app.use(express.json());

app.use('/patient', PatientRoutes);
app.use('/doctor', DoctorRoutes);
app.use('/auth', AuthRoutes);
// app.use('/appointment', AppointmentRoutes);
app.use('/admin', AdminRoutes);

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    return response.json({
        error: {
            message: error.message
        }
    });
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
