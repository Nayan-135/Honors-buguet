document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("budgetForm");
    const subcategorySelect = document.getElementById("subcategory");
    const tableBody = document.querySelector("#dataTable tbody");

    const subcategories = {
        Grocery: ["Fruits", "Vegetables", "Snacks"],
        Electronics: ["Mobile", "Laptop", "Accessories"],
        Clothing: ["Men", "Women", "Kids"],
    };

    // Populate subcategories based on selected category
    document.getElementById("category").addEventListener("change", (e) => {
        const category = e.target.value;
        subcategorySelect.innerHTML = '<option value="" disabled selected>Select Sub-category</option>';
        if (subcategories[category]) {
            subcategories[category].forEach((sub) => {
                const option = document.createElement("option");
                option.value = sub;
                option.textContent = sub;
                subcategorySelect.appendChild(option);
            });
        }
    });

    // Handle form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            category: document.getElementById("category").value,
            subcategory: document.getElementById("subcategory").value,
            productName: document.getElementById("productName").value,
            mrp: document.getElementById("mrp").value,
            cost: document.getElementById("cost").value,
            lastYearBudget: document.getElementById("lastYearBudget").value,
            comment: document.getElementById("comment").value,
        };

        try {
            // Save data to the server
            const response = await fetch("/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Data saved successfully");

                // Add data to the table
                const row = tableBody.insertRow();
                Object.values(data).forEach((value) => {
                    const cell = row.insertCell();
                    cell.textContent = value;
                });

                form.reset();
            } else {
                console.error("Failed to save data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
