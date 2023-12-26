import { useEffect, useState } from "react"
import AmountInput from "./AmountInput"
import ResultRow from "./ResultRow"
import axios from "axios"
import { sortBy } from "lodash"
import useDebouncedEffect from "use-debounced-effect"
import LoadingSkeleton from "./LoadingSkeleton"

type BitCoinPrice = {
  _id?: string
  provider: string
  BitCoin: string
}

const defaultAmount = "100"

function App() {
  const [amount, setAmount] = useState(defaultAmount)
  const [bitCoinPrices, setbitCoinPrices] = useState<BitCoinPrice[]>([])
  const [isLoading, setIsloading] = useState(true)
  const [preAmount, setPreAmount] = useState("100")

  useEffect(() => {
    const getBitCoinPrice = async () => {
      setIsloading(true)
      try {
        const { data } = await axios.get(
          "https://39d81am3jk.us.aircode.run/cachedValues"
        )
        setbitCoinPrices(data)
      } catch (err) {
        console.error(err)
      }
    }

    getBitCoinPrice()
    //setTimeout(()=>setIsloading(false), 1000)
    setIsloading(false)
    setPreAmount(amount)
  }, [])

  useDebouncedEffect(
    () => {
      const getUpdatedOffers = async () => {
        try {
          const { data } = await axios.get(
            "https://39d81am3jk.us.aircode.run/offers?amount=" +
              amount.toString()
          )
          const offersData = Object.keys(data).map((provider) => {
            return { provider, BitCoin: data[provider] }
          })
          setbitCoinPrices(offersData)
          setPreAmount(amount)
        } catch (err) {
          console.error(err)
        }
      }
      if (amount === preAmount) return
      if (amount !== preAmount) {
        setIsloading(true)
        getUpdatedOffers()
        setIsloading(false)
      }
    },
    300,
    [amount]
  )

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="uppercase text-3xl sm:text-6xl text-center font-bold bg-gradient-to-br from-purple-600 to-sky-400 bg-clip-text text-transparent from-30%">
        Find cheapest BTC
      </h1>
      <div className="flex justify-center mt-6 mb-8 ">
        <AmountInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        sortBy(bitCoinPrices, "BitCoin")
          .reverse()
          .map((item: BitCoinPrice) => (
            <ResultRow
              key={item.provider}
              providerName={item.provider}
              price={new Intl.NumberFormat("us-SE", {
                minimumFractionDigits: 8,
              }).format(Number(item.BitCoin))}
              loading={isLoading}
            />
          ))
      )}
    </main>
  )
}

export default App
