import { ethers, upgrades } from "hardhat";

const main = async () => {
  const counterUpgradeableAddress = "";
  const CounterUpgradeable = await ethers.getContractFactory("CounterUpgradeable");
  const counterUpgradeable = await upgrades.upgradeProxy(counterUpgradeableAddress, CounterUpgradeable);
  await counterUpgradeable.waitForDeployment();
  console.log("CounterUpgradeable upgraded");
};

main();
