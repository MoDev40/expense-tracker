import CreateTag from "../_components/tags/CreateTag"
import TagLists from "../_components/tags/TagLists"
function page() {
  return (
    <div className="mx-auto space-y-4 mt-5 p-2 lg:max-w-[1120px] max-w-lg">
      <CreateTag/>
      <TagLists/>
    </div>
  )
}

export default page