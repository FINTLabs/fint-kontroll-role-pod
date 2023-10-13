import Search from "../../common/Search";

// export default function MemberSearch(props: { roleId: number; }) {
export default function ResourceSearch() {
    // const {searchValue} = useMembers();

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
            inputValue={''}
            placeholder="Search resources"
            // showClearIcon={ (searchValue === "" ? "none" : "flex")}
        />
    );
}
