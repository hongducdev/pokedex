import { useState } from "react";
import "./App.scss";
import PokeList from "./components/PokeList";
import Search from "./components/Search";

function App() {
    // lấy giá trị của input
    const [searchValue, setSearchValue] = useState("");

    console.log("searchValue: ", searchValue);

    // khi click vào nút search thì gọi hàm handleSearch
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("searchValue: ", searchValue);
    };

    return (
        <div className="App">
            <Search
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSearch={handleSearch}
            />
            <PokeList searchValue={searchValue} />
        </div>
    );
}

export default App;
