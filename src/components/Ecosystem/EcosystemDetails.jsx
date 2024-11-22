import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "../Button"
import arrowBack from "/public/icons/arrowBack.svg"

function EcosystemDetails({ ecosystem }) {
  const router = useRouter()

  if (router.isFallback || !ecosystem) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  const handleBackClick = () => {
    router.push("/ecosystems")
  }

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16">
      <div>
        <div className="pb-8">
          {ecosystem.logo && (
            <Image
              src={ecosystem.logo}
              alt={`${ecosystem.name} logo`}
              width={96}
              height={96}
            />
          )}
        </div>

        <p className="pb-8">{ecosystem.summary}</p>

        {ecosystem.keyStats && (
          <div className="mb-8 rounded-lg border p-4 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Key Stats</h2>
            <ul className="space-y-2">
              {Object.entries(ecosystem.keyStats).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="font-medium capitalize">{key}:</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {ecosystem.insights && (
          <div className="mb-8 rounded-lg border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">
              {ecosystem.insights.title}
            </h2>
            <p>{ecosystem.insights.data}</p>
          </div>
        )}

        {ecosystem.applications && (
          <div className="mb-8 rounded-lg border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">
              {ecosystem.applications.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ecosystem.applications.data.map((app, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-md border p-2 shadow-sm"
                >
                  <span>
                    <i className={`fas ${app.icon} text-xl text-[#BB44F0]`}></i>
                  </span>
                  <div>
                    <h3 className="font-medium">{app.label}</h3>
                    <p className="text-sm text-gray-600">{app.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ecosystem.innovations && (
          <div className="mb-8 rounded-lg border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">
              {ecosystem.innovations.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ecosystem.innovations.data.map((innovation, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-md border p-2 shadow-sm"
                >
                  <span>
                    <i
                      className={`fas ${innovation.icon} text-xl text-[#BB44F0]`}
                    ></i>
                  </span>
                  <div>
                    <h3 className="font-medium">{innovation.label}</h3>
                    <p className="text-sm text-gray-600">{innovation.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ecosystem.challenges && (
          <div className="mb-8 rounded-lg border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">
              {ecosystem.challenges.title}
            </h2>
            <p>{ecosystem.challenges.data}</p>
          </div>
        )}

        {ecosystem.keyPlayers && (
          <div className="mb-8 rounded-lg border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">
              {ecosystem.keyPlayers.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ecosystem.keyPlayers.data.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-md border p-2 shadow-sm"
                >
                  <Image
                    src={player.logo}
                    alt={`${player.name} logo`}
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{player.name}</h3>
                    <p className="text-sm text-gray-600">
                      HQ: {player.HQ} | Funding: {player.funding}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto my-4 flex max-w-fit lg:mx-0">
          <Button onClick={handleBackClick}>
            <Image src={arrowBack} alt="Back" width={24} height={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EcosystemDetails
