export default function Filter({ categories, selectedCategories, onChange }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(
            category.title.toLowerCase()
          )
          return (
            <div
              key={category.title}
              onClick={() => onChange(category.title.toLowerCase())}
              className={`cursor-pointer rounded-lg px-4 py-2 ${
                isSelected
                  ? "bg-[#e8e8e8] text-[#34333d]"
                  : "bg-[#34333d] text-[#e8e8e8] hover:bg-gray-600 hover:text-white"
              } transition-all duration-300`}
            >
              {category.title.charAt(0).toUpperCase() + category.title.slice(1)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
