export function BlogMenu() {
    return (
        <div className="flex gap-4 justify-between">
            <BlogFilterTags />
            <BlogSearch />
        </div>
    )
}

// Each blog will only ever have one tag
function BlogFilterTags() {
    return (
        <form className="filter">
            <input className="btn btn-square" type="reset" value="×"/>
            <input className="btn" type="radio" name="frameworks" aria-label="Programming"/>
            <input className="btn" type="radio" name="frameworks" aria-label="Life"/>
            <input className="btn" type="radio" name="frameworks" aria-label="Personal"/>
            <input className="btn" type="radio" name="frameworks" aria-label="Random"/>
        </form>
    )
}

// Searches through the blogs by title
function BlogSearch() {
    return (
        <label className="input">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
            <input type="search" className="grow" placeholder="Search" />
        </label>
    )
}