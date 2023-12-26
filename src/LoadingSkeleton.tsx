import React from 'react'
import ResultRow from "./ResultRow"

const LoadingSkeleton = () => {
  return (
    <>
    <ResultRow providerName={""} price={""} loading={true} />
    <ResultRow providerName={""} price={""} loading={true} />
    <ResultRow providerName={""} price={""} loading={true} />
    <ResultRow providerName={""} price={""} loading={true} />
  </>
  )
}

export default LoadingSkeleton