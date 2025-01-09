import Image from "next/image"

export default function CompanyProductStatCard({ product }) {
  return product.data.image ? (
    <div className="company-product-stat-card">
      <div className="company-product-stat-card__image">
        <Image src={product.data.image} alt={product.name} />
      </div>

      <div className="company-product-stat-card__content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
    </div>
  ) : null
}
