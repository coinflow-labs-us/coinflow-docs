import {ethers} from 'ethers';
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from '@nomiclabs/hardhat-ethers/types';

import * as Contracts from '.';

declare module 'hardhat/types/runtime' {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: 'Initializable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: 'ReentrancyGuardUpgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuardUpgradeable__factory>;
    getContractFactory(
      name: 'ERC20Upgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Upgradeable__factory>;
    getContractFactory(
      name: 'IERC20MetadataUpgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20MetadataUpgradeable__factory>;
    getContractFactory(
      name: 'IERC20PermitUpgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20PermitUpgradeable__factory>;
    getContractFactory(
      name: 'IERC20Upgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Upgradeable__factory>;
    getContractFactory(
      name: 'ERC721Upgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Upgradeable__factory>;
    getContractFactory(
      name: 'IERC721MetadataUpgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721MetadataUpgradeable__factory>;
    getContractFactory(
      name: 'IERC721ReceiverUpgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721ReceiverUpgradeable__factory>;
    getContractFactory(
      name: 'IERC721Upgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Upgradeable__factory>;
    getContractFactory(
      name: 'ContextUpgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: 'ERC165Upgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: 'IERC165Upgradeable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: 'IUniswapV3SwapCallback',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3SwapCallback__factory>;
    getContractFactory(
      name: 'ISwapRouter',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISwapRouter__factory>;
    getContractFactory(
      name: 'AddressUtils',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AddressUtils__factory>;
    getContractFactory(
      name: 'Admin',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Admin__factory>;
    getContractFactory(
      name: 'BurnV1',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BurnV1__factory>;
    getContractFactory(
      name: 'BuyV1',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BuyV1__factory>;
    getContractFactory(
      name: 'CoinflowToken',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CoinflowToken__factory>;
    getContractFactory(
      name: 'CoinflowV1',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CoinflowV1__factory>;
    getContractFactory(
      name: 'CoinflowV2',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CoinflowV2__factory>;
    getContractFactory(
      name: 'CoinflowV3',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CoinflowV3__factory>;
    getContractFactory(
      name: 'CoinflowV4',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CoinflowV4__factory>;
    getContractFactory(
      name: 'CreditsManagement',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CreditsManagement__factory>;
    getContractFactory(
      name: 'CreditsMetadata',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CreditsMetadata__factory>;
    getContractFactory(
      name: 'CreditsPermit',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CreditsPermit__factory>;
    getContractFactory(
      name: 'DomainSeparator',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DomainSeparator__factory>;
    getContractFactory(
      name: 'ERC20Utils',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Utils__factory>;
    getContractFactory(
      name: 'IERC20Extended',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Extended__factory>;
    getContractFactory(
      name: 'IWETH',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH__factory>;
    getContractFactory(
      name: 'IWETH',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH__factory>;
    getContractFactory(
      name: 'NftMinting',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NftMinting__factory>;
    getContractFactory(
      name: 'IWETH',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH__factory>;
    getContractFactory(
      name: 'NftsExchange',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NftsExchange__factory>;
    getContractFactory(
      name: 'PausableContract',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableContract__factory>;
    getContractFactory(
      name: 'RedeemForNft',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RedeemForNft__factory>;
    getContractFactory(
      name: 'RedeemSwapV1',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RedeemSwapV1__factory>;
    getContractFactory(
      name: 'RedeemV3',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RedeemV3__factory>;
    getContractFactory(
      name: 'RedeemV4',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RedeemV4__factory>;
    getContractFactory(
      name: 'AccessControl',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: 'AccessControlMixin',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlMixin__factory>;
    getContractFactory(
      name: 'Blacklistable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Blacklistable__factory>;
    getContractFactory(
      name: 'EIP712',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP712__factory>;
    getContractFactory(
      name: 'EIP712Domain',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP712Domain__factory>;
    getContractFactory(
      name: 'ERC20',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: 'GasAbstraction',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GasAbstraction__factory>;
    getContractFactory(
      name: 'IChildToken',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IChildToken__factory>;
    getContractFactory(
      name: 'IERC20',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: 'Initializable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: 'MaticGasAbstraction',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MaticGasAbstraction__factory>;
    getContractFactory(
      name: 'NativeMetaTransaction',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NativeMetaTransaction__factory>;
    getContractFactory(
      name: 'Nonces',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Nonces__factory>;
    getContractFactory(
      name: 'Pausable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: 'Permit',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Permit__factory>;
    getContractFactory(
      name: 'Rescuable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Rescuable__factory>;
    getContractFactory(
      name: 'UChildERC20',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UChildERC20__factory>;
    getContractFactory(
      name: 'Usdc',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Usdc__factory>;
    getContractFactory(
      name: 'UsdcUtils',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UsdcUtils__factory>;
    getContractFactory(
      name: 'UsdcWrapper',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UsdcWrapper__factory>;
    getContractFactory(
      name: 'WethUtils',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WethUtils__factory>;
    getContractFactory(
      name: 'Whitelistable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Whitelistable__factory>;

    getContractAt(
      name: 'Initializable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: 'ReentrancyGuardUpgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuardUpgradeable>;
    getContractAt(
      name: 'ERC20Upgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Upgradeable>;
    getContractAt(
      name: 'IERC20MetadataUpgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20MetadataUpgradeable>;
    getContractAt(
      name: 'IERC20PermitUpgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20PermitUpgradeable>;
    getContractAt(
      name: 'IERC20Upgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Upgradeable>;
    getContractAt(
      name: 'ERC721Upgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Upgradeable>;
    getContractAt(
      name: 'IERC721MetadataUpgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721MetadataUpgradeable>;
    getContractAt(
      name: 'IERC721ReceiverUpgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721ReceiverUpgradeable>;
    getContractAt(
      name: 'IERC721Upgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Upgradeable>;
    getContractAt(
      name: 'ContextUpgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: 'ERC165Upgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: 'IERC165Upgradeable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: 'IUniswapV3SwapCallback',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3SwapCallback>;
    getContractAt(
      name: 'ISwapRouter',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISwapRouter>;
    getContractAt(
      name: 'AddressUtils',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AddressUtils>;
    getContractAt(
      name: 'Admin',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Admin>;
    getContractAt(
      name: 'BurnV1',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BurnV1>;
    getContractAt(
      name: 'BuyV1',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BuyV1>;
    getContractAt(
      name: 'CoinflowToken',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CoinflowToken>;
    getContractAt(
      name: 'CoinflowV1',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CoinflowV1>;
    getContractAt(
      name: 'CoinflowV2',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CoinflowV2>;
    getContractAt(
      name: 'CoinflowV3',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CoinflowV3>;
    getContractAt(
      name: 'CoinflowV4',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CoinflowV4>;
    getContractAt(
      name: 'CreditsManagement',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CreditsManagement>;
    getContractAt(
      name: 'CreditsMetadata',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CreditsMetadata>;
    getContractAt(
      name: 'CreditsPermit',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CreditsPermit>;
    getContractAt(
      name: 'DomainSeparator',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DomainSeparator>;
    getContractAt(
      name: 'ERC20Utils',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Utils>;
    getContractAt(
      name: 'IERC20Extended',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Extended>;
    getContractAt(
      name: 'IWETH',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH>;
    getContractAt(
      name: 'IWETH',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH>;
    getContractAt(
      name: 'NftMinting',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NftMinting>;
    getContractAt(
      name: 'IWETH',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH>;
    getContractAt(
      name: 'NftsExchange',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NftsExchange>;
    getContractAt(
      name: 'PausableContract',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableContract>;
    getContractAt(
      name: 'RedeemForNft',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RedeemForNft>;
    getContractAt(
      name: 'RedeemSwapV1',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RedeemSwapV1>;
    getContractAt(
      name: 'RedeemV3',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RedeemV3>;
    getContractAt(
      name: 'RedeemV4',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RedeemV4>;
    getContractAt(
      name: 'AccessControl',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControl>;
    getContractAt(
      name: 'AccessControlMixin',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlMixin>;
    getContractAt(
      name: 'Blacklistable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Blacklistable>;
    getContractAt(
      name: 'EIP712',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP712>;
    getContractAt(
      name: 'EIP712Domain',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP712Domain>;
    getContractAt(
      name: 'ERC20',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: 'GasAbstraction',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GasAbstraction>;
    getContractAt(
      name: 'IChildToken',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IChildToken>;
    getContractAt(
      name: 'IERC20',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: 'Initializable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: 'MaticGasAbstraction',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MaticGasAbstraction>;
    getContractAt(
      name: 'NativeMetaTransaction',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NativeMetaTransaction>;
    getContractAt(
      name: 'Nonces',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Nonces>;
    getContractAt(
      name: 'Pausable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: 'Permit',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Permit>;
    getContractAt(
      name: 'Rescuable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Rescuable>;
    getContractAt(
      name: 'UChildERC20',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UChildERC20>;
    getContractAt(
      name: 'Usdc',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Usdc>;
    getContractAt(
      name: 'UsdcUtils',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UsdcUtils>;
    getContractAt(
      name: 'UsdcWrapper',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UsdcWrapper>;
    getContractAt(
      name: 'WethUtils',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WethUtils>;
    getContractAt(
      name: 'Whitelistable',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Whitelistable>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
