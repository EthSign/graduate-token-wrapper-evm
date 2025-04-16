import { ethers, upgrades } from "hardhat";

const main = async () => {
  const CounterUpgradeable = await ethers.getContractFactory("CounterUpgradeable");
  const counterUpgradeable = await upgrades.deployProxy(CounterUpgradeable, []);
  await counterUpgradeable.waitForDeployment();
  console.log("CounterUpgradeable deployed to:", await counterUpgradeable.getAddress());
};

main();
