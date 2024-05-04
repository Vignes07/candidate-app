import DropDown from "./components/Dropdown.jsx";
import SearchBar from "./components/SearchBar.jsx";
import PropTypes from "prop-types";

function Filters({ onFiltersChange }) {
  const role = [
    { title: "Engineering", role: "Frontend" },
    { title: "Engineering", role: "Backend" },
    { title: "Engineering", role: "Fullstack" },
    { title: "Engineering", role: "IOS" },
    { title: "Engineering", role: "Flutter" },
    { title: "Engineering", role: "React Native" },
    { title: "Engineering", role: "Android" },
    { title: "Engineering", role: "Tech Lead" },
    { title: "Engineering", role: "Dev-Ops" },
    { title: "Engineering", role: "Data Engineer" },
    { title: "Engineering", role: "Data Science" },
    { title: "Engineering", role: "Computer-Vision" },
    { title: "Engineering", role: "Nlp" },
    { title: "Engineering", role: "Deep-Learning" },
    { title: "Engineering", role: "Test / QA" },
    { title: "Engineering", role: "Web3" },
    { title: "Engineering", role: "Sre" },
    { title: "Engineering", role: "Data Infrastructure" },
    { title: "Design", role: "Designer" },
    { title: "Design", role: "Design Manager" },
    { title: "Design", role: "Graphic Designer" },
    { title: "Design", role: "Product Designer" },
    { title: "Product", role: "Product manager" },
    { title: "Operations", role: "Operations Manager" },
    { title: "Operations", role: "Founder's Office/Chief Of Staff" },
    { title: "Sales", role: "Sales Development Representative" },
    { title: "Sales", role: "Account Executive" },
    { title: "Sales", role: "Account Manager" },
    { title: "Marketing", role: "Digital Marketing Manager" },
    { title: "Marketing", role: "Growth Hacker" },
    { title: "Marketing", role: "Marketing" },
    { title: "Marketing", role: "Product Marketing Manager" },
    { title: "Other Engineering", role: "Hardware" },
    { title: "Other Engineering", role: "Mechanical" },
    { title: "Other Engineering", role: "Systems" },
    { title: "Business Analyst", role: "Business Analyst" },
    { title: "Data Analyst", role: "Data Analyst" },
    { title: "Project Manager", role: "Project Manager" },
    { title: "Management", role: "Management" },
    { title: "Legal", role: "Legal" },
    { title: "HR", role: "HR" },
    { title: "Finance", role: "Finance" },
  ];

  const experience = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const modeOfWork = ["Remote", "Hybrid", "In-office"];

  const noOfEmployees = [
    "1-10",
    "11-20",
    "21-50",
    "51-100",
    "101-200",
    "201-500",
    "500+",
  ];

  const minSalary = ["10L", "20L", "30L", "40L", "50L", "60L", "70L"];

  const techStack = [
    "Python",
    "Java",
    "GoLang",
    "Ruby/Rails",
    "C++",
    "Kotlin",
    "Django",
    "C#",
    "GraphQL",
    "Flask",
    "Typescript",
    "AWS",
    "Javascript",
    "Rust",
    "NodeJS",
    "React",
  ];

  return (
    <div className={"filters"}>
      <DropDown
        name={"jobRole"}
        label={"Roles"}
        placeholder={"Roles"}
        width={8}
        options={role}
        multiple={true}
        setSelectedFilters={onFiltersChange}
      />
      <DropDown
        name={"noOfEmployees"}
        label={"No Of Employees"}
        placeholder={"Number Of Employees"}
        width={13}
        options={noOfEmployees}
        multiple={true}
        setSelectedFilters={onFiltersChange}
      />
      <DropDown
        name={"minExp"}
        label={"Experience"}
        placeholder={"Experience"}
        width={8}
        options={experience}
        multiple={false}
        setSelectedFilters={onFiltersChange}
      />
      <DropDown
        name={"remote"}
        label={"Remote"}
        placeholder={"Remote"}
        width={7}
        options={modeOfWork}
        multiple={true}
        setSelectedFilters={onFiltersChange}
      />
      <DropDown
        name={"techStack"}
        label={"Tech Stack"}
        placeholder={"Tech Stack"}
        width={8}
        options={techStack}
        multiple={true}
        setSelectedFilters={onFiltersChange}
      />
      <DropDown
        name={"minJdSalary"}
        label={"Min Base Pay"}
        placeholder={"Minimum Base Pay Salary"}
        width={12}
        options={minSalary}
        multiple={false}
        setSelectedFilters={onFiltersChange}
      />
      <SearchBar
        name={"companyName"}
        label={"Company Name"}
        placeholder={"Search Company Name"}
        width={12}
        setSelectedFilters={onFiltersChange}
      />
    </div>
  );
}

Filters.propTypes = {
  onFiltersChange: PropTypes.func.isRequired,
};

export default Filters;
