import paybisLogo from "./assets/paybis.png"

type ResultRowProps = {
  loading: boolean,
  providerName: string,
  price: string,
}
type Logo = {
  source:string,
  invert?:boolean,
}

const logoUrls:{[keys:string]:Logo} = {
  paybis: { source: paybisLogo, invert: true },
  guardarian: {
    source: "https://guardarian.com/main-logo.svg",
    invert: false,
  },
  moonPay: {
    source: "https://www.moonpay.com/assets/logo-full-white.svg",
    invert: false,
  },
  transak: {
    source: "https://assets.transak.com/images/website/transak-logo.svg",
    invert: false,
  },
}

const ResultRow = ({ loading, providerName, price }: ResultRowProps) => {

  let  url = `https://${providerName}.com`
  if (providerName === 'guaridarian') url+='/buy-btc'

  return (
    <a href={url} target='_blank' className="block  relative border min-h-24 border-blue-50/10 mt-4 rounded-lg bg-gradient-to-r from-indigo-500/10 to-blue-500/10 px-4 py-2 overflow-hidden">
      {loading ? (
        <div className=" inset-0 absolute bg-gradient-to-r from-transparent via-purple-900/50 to-transparent skeleton-animation">
          
        </div>
      ) : (
        <div className="inset-0 absolute px-2 sm:px-6 flex gap-4 items-center justify-around ">
          <div className={" w-48 rounded-lg overflow-hidden "+ (logoUrls[providerName].invert?'invert':'')}>
            <img src={logoUrls[providerName]?.source} alt="Paybi logo" />
          </div>
          <div className="grow uppercase text-2xl hidden sm:block">{providerName}</div>

          <div className="flex gap-2">
            <span className="text-2xl text-indigo-200/90">{price}</span>
            <span className="text-2xl text-indigo-300/50">BTC</span>
          </div>
        </div>
      )}
    </a>
  )
}

export default ResultRow
