// TypeScript
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployCounter: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  await deploy("Counter", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: 1,
  });
};

export default deployCounter;
deployCounter.tags = ["Counter"];
