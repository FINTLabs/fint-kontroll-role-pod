import {useContext} from "react";
import {MemberContext} from "../../../context/memberContext";
import Search from "../../common/Search";

// export default function MemberSearch(props: { roleId: number; }) {
export default function MemberSearch() {
    const {searchValue} = useContext(MemberContext);

    const handleSearch = () => {
        console.log("Handle resources search")
    };

    const handleClear = () => {
        console.log("Handle search resources clear")
    };

    return (
        <Search
            searchFunction={handleSearch}
            clearFunction={handleClear}
            inputValue={searchValue}
            placeholder="Search resources"
            // showClearIcon={ (searchValue === "" ? "none" : "flex")}
        />
    );
}
