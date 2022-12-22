import { useState } from "react";
import "./App.scss";
import PokeList from "./components/PokeList";
import Search from "./components/Search";

function App() {
   // lấy giá trị của input
   const [searchValue, setSearchValue] = useState("");
   const [searchData, setSearchData] = useState();

   // khi ấn enter thì sẽ thực hiện setSearchData(searchValue);
   const handleSearch = (e) => {
      e.preventDefault();
      // kiểm tra xem searchValue có rỗng hay kí tự trắng
      if (searchValue.trim()) {
         setSearchData(searchValue);
         setSearchValue("");
      }
   };

   return (
      <div className="App">
         <Search
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
            handleDelete={() => setSearchData("")}
         />
         <PokeList searchData={searchData}/>
      </div>
   );
}

export default App;
