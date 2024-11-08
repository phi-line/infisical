import { ProjectPermissionCmekActions, ProjectPermissionSub } from "@app/context";
import { withProjectPermission } from "@app/hoc";

import { CmekTable } from "./components";

export const ConsumerSecretsPage = withProjectPermission(
  () => {
    return (
      <div className="container mx-auto flex flex-col justify-between bg-bunker-800 text-white">
        <div className="mx-auto mb-6 w-full max-w-7xl py-6 px-6">
          <p className="mr-4 text-3xl font-semibold text-white">Consumer Secrets</p>
          <p className="text-md mb-4 text-bunker-300">
            Create and manage project-wide secrets
          </p>
          <CmekTable />
        </div>
      </div>
    );
  },
  {
    action: ProjectPermissionCmekActions.Read,
    subject: ProjectPermissionSub.Cmek
  }
);
