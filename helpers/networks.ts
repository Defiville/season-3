// address on Polygon (POS) networks
export type TokenDefinition = {
  name: string
  address : string,
  symbol: string,
  decimals: number,
  chainId: number,
  logoURI: string,
}

export const islaGaugeNetwork:TokenDefinition = {
  name: "IslaGauge",
  address : "0x2DE8a306732A5a8E0FbF1b2B8AA32FC9Bc958c2e",
  symbol: "ISLAG",
  decimals: 0,
  chainId: 137,
  logoURI: "",
}

export const usdtNetwork:TokenDefinition = {
  name: "Tether USD",
  address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  symbol: "USDT",
  decimals: 6,
  chainId: 137,
  logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
}

export const usdcNetwork:TokenDefinition = {
  name: "USDCoin",
  address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  symbol: "USDC",
  decimals: 6,
  chainId: 137,
  logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" 
}

export const daiNetwork:TokenDefinition = {
  name: "Dai Stablecoin",
  address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  symbol: "DAI",
  decimals: 18,
  chainId: 137,
  logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
}

export const bAnyMinterNetwork:TokenDefinition = {
  name: "BANY Minter",
  address: "0xbD8BeEE407CAAC3B2f95Eb96f7Fd571a5dEb2A3F",
  symbol: "BANY Minter",
  decimals: 0,
  chainId: 137,
  logoURI: ""
}

export const treasuryTbaNetwork: TokenDefinition = {
  name: "TreasuryTBA",
  address:"0xa91639Da94bBff6D3efE6e92AE5788a90fb0aF26",
  symbol: "TreasuryTBA",
  decimals: 0,
  chainId: 137,
  logoURI: ""
}

export const bAnyNetwork: TokenDefinition = {
  name:"Backed Any",
  address: "0xD51a5153f21D035CfBEBf640666f9A79d4d2BaF5",
  symbol:"BANY",
  decimals: 18,
  chainId:137,
  logoURI:"",
}

export const islaNetwork: TokenDefinition = {
  name:"Defiville Island Token",
  address: "0xFE6A2342f7C5D234E8496dF12c468Be17e0c181F",
  symbol:"ISLA",
  decimals: 18,
  chainId:137,
  logoURI:"",
}

export const bondingTokens = [
  daiNetwork, usdcNetwork, usdtNetwork
];