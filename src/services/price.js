import supabase from "./supabase";

export async function getPrice() {
  const { data, error } = await supabase.from("pricing").select("*");

  console.log("Data from Supabase:", data); // Log the data fetched from Supabase
  if (error) {
    console.error("Error fetching pricing:", error);
    throw new Error("Price could not be loaded");
  }

  return data;
}

export async function updatePrice({ id, obj }) {
  const { data, error } = await supabase
    .from("pricing")
    .update(obj) // obj is the object that contains the fields to update
    .eq("pricing_id", id) // Use pricing_id instead of id
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

export async function insertBooking(flattenedBooking) {
  try {
    // Check for duplicate entries
    const { data: existingBookings, error: selectError } = await supabase
      .from("bookings")
      .select("*")
      .eq("weddingDate", flattenedBooking.weddingDate)
      .eq("clientName", flattenedBooking.clientName)
      .eq("contactNumber", flattenedBooking.contactNumber);

    if (selectError) {
      console.error("Error checking for duplicates:", selectError);
      throw new Error("Error checking for duplicate bookings");
    }

    // If a duplicate is found, stop the process
    if (existingBookings && existingBookings.length > 0) {
      console.warn("Duplicate booking found:", existingBookings);
      throw new Error("Duplicate booking detected. Entry not added.");
    }

    // Proceed with the insert if no duplicate
    const { data, error } = await supabase
      .from("bookings")
      .insert([flattenedBooking]);

    if (error) {
      console.error("Error inserting booking:", error);
      throw new Error("Bookings cannot be added");
    }

    return data;
  } catch (error) {
    alert("You have already been booked!");
    console.error("Error in insertBooking:", error);
    throw error;
  }
}
