import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateCats() {
    const [dropdownOptions, setDropdownOptions] = useState([
        "Easy",
        "Medium",
        "Hard",
        "Impossible",
    ]);
    const [categories, setCategories] = useState([
        { name: "", difficulty: "" },
        { name: "", difficulty: "" },
        { name: "", difficulty: "" },
        { name: "", difficulty: "" },
    ]);

    // Allows user to choose a difficulty for each category
    // Ensures each category has a unique difficulty
    function chooseDifficulty(difficulty, index) {
        // Remove the difficulty from the dropdown options
        let newDropdownOptions = dropdownOptions.filter(
            (option) => option !== difficulty
        );
        // If the difficulty is being changed from one to another, add the old difficulty back to the dropdown options
        if (categories[index].difficulty !== "") {
            newDropdownOptions.push(categories[index].difficulty);
        }
        setDropdownOptions(newDropdownOptions);

        // Set the difficulty of the category at the given index
        let newCategories = [...categories];
        newCategories[index].difficulty = difficulty;
        setCategories(newCategories);
    }
    // Set the name of the category at the given index
    function categoryName(name, index) {
        let newCategories = [...categories];
        newCategories[index].name = name;
        setCategories(newCategories);
    }

    // Reset one dropdown option and add the old difficulty back to the dropdown options
    function resetDropdown(index) {
        console.log("Resetting dropdown");
        let newCategories = [...categories];
        let newDropdownOptions = [...dropdownOptions];
        newDropdownOptions.push(newCategories[index].difficulty);
        newCategories[index].difficulty = "";
        setCategories(newCategories);
        setDropdownOptions(newDropdownOptions);
    }
    return (
        <div>
            {/* Create 4 categories, difficulty assigned to each */}
            <h1>Create Categories</h1>
            {categories.map((category, index) => (
                <div key={index}>
                    <h2>Category {index + 1}</h2>
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={category.name}
                        onChange={(e) => categoryName(e.target.value, index)}
                    />
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {category.difficulty === ""
                                ? "Select Difficulty"
                                : category.difficulty}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {dropdownOptions.map((difficulty, i) => (
                                <Dropdown.Item
                                    key={i}
                                    onClick={() => chooseDifficulty(difficulty, index)}
                                >
                                    {difficulty}
                                </Dropdown.Item>
                            ))}
                            <Dropdown.Item onClick={() => resetDropdown(index)}>Reset</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ))}
            <button onClick={(e) => console.log(categories)}>Create</button>
        </div>
    );
}

export default CreateCats;
