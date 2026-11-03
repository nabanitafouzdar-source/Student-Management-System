
/* ==============================
   SUPABASE CONFIGURATION
================================ */

// Replace these with your Supabase details

const SUPABASE_URL = "https://qxmsosomthxfzcbvefhy.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_IODtbUh3IkL5MkiAGzQwtg_pAZkbiXc";

// Create Supabase client

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


/* ==============================
   STUDENT REGISTRATION
================================ */

const studentForm = document.getElementById("studentForm");

const message = document.getElementById("message");

const submitBtn = document.getElementById("submitBtn");


studentForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get form values

    const fullName = document
        .getElementById("full_name")
        .value.trim();

    const email = document
        .getElementById("email")
        .value.trim();

    const phone = document
        .getElementById("phone")
        .value.trim();

    const course = document
        .getElementById("course")
        .value;


    // Check empty fields

    if (!fullName || !email || !phone || !course) {

        message.textContent = "Please fill all fields.";

        message.className = "error";

        return;
    }


    // Disable button during submission

    submitBtn.disabled = true;

    submitBtn.textContent = "Registering...";

    message.textContent = "";


    try {

        // Insert data into Supabase

        const { data, error } = await supabaseClient
            .from("students")
            .insert([
                {
                    full_name: fullName,
                    email: email,
                    phone: phone,
                    course: course
                }
            ])
            .select();


        // Handle database error

        if (error) {
            throw error;
        }


        // Success message

        message.textContent =
            "Student registered successfully!";

        message.className = "success";


        // Reset form

        studentForm.reset();

        console.log("Student saved:", data);

    }

    catch (error) {

        console.error("Supabase Error:", error);

        message.textContent =
            "Registration failed: " + error.message;

        message.className = "error";

    }

    finally {

        // Enable button again

        submitBtn.disabled = false;

        submitBtn.textContent = "Register Student";

    }

});
