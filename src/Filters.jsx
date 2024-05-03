import DropDown from "./components/Dropdown.jsx";
import SearchBar from "./components/SearchBar.jsx";

function Filters() {
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

  return (
    <div className={"filters"}>
      <DropDown
        label={"Roles"}
        placeholder={"Roles"}
        width={8}
        options={role}
        multiple={true}
      />
      <DropDown
        label={"No Of Employees"}
        placeholder={"Number Of Employees"}
        width={13}
        options={noOfEmployees}
        multiple={true}
      />
      <DropDown
        label={"Experience"}
        placeholder={"Experience"}
        width={8}
        options={experience}
        multiple={false}
      />
      <DropDown
        label={"Remote"}
        placeholder={"Remote"}
        width={8}
        options={modeOfWork}
        multiple={true}
      />
      <DropDown
        label={"Min Base Pay"}
        placeholder={"Minimum Base Pay Salary"}
        width={15}
        options={minSalary}
        multiple={false}
      />
      <SearchBar
        label={"Company Name"}
        placeholder={"Search Company Name"}
        width={12}
      />
    </div>
  );
}

export default Filters;
