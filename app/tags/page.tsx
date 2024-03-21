import CreateTag from "../_components/tags/CreateTag"
async function page() {
  return (
    <div className="mx-auto p-2 lg:max-w-[1120px] max-w-lg">
      <CreateTag/>
    </div>
  )
}

export default page