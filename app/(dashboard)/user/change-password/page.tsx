"use client";

import { Header } from "@/components";
import { IChangePassword } from "@/interface";
import { navData } from "@/lib/data";
import { Button, Container } from "@/universal";
import { Axios, loadingToast } from "@/utils";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChangePassword: NextPage = () => {
  const [updatedData, setUpdatedData] = useState<IChangePassword>();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    updatedData && setDisabled(false);
  }, [updatedData]);

  const handleChangePassword = () => {
    const id = toast.loading("Changing password...");

    if (updatedData?.newPassword !== updatedData?.reTypePassword) {
      loadingToast(id, "Password didn't match!", "error");
    } else {
      Axios.patch("/auth/change-password", updatedData)
        .then(({ data }) => {
          if (data.data) {
            loadingToast(id, data.message, "success");
          }
        })
        .catch(({ response }) => {
          loadingToast(id, response.data.message, "error");
        });
    }
  };

  return (
    <main>
      <Header navData={navData.profile} />

      <Container className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold my-10 text-center">
          Change Password
        </h1>
        <div className="flex flex-col justify-center items-center gap-2.5">
          <div className="text-lg py-1">
            <span className="font-semibold pl-2">Old Password:&nbsp;</span>
            <input
              type="password"
              name="oldPassword"
              onChange={(e) =>
                setUpdatedData((prv) => {
                  return {
                    ...prv,
                    oldPassword: e.target.value,
                  };
                })
              }
              className="outline-none pl-1.5 bg-gray-100 rounded-sm"
            />
          </div>
          <div className="text-lg py-1">
            <span className="font-semibold pl-2">New Password:&nbsp;</span>
            <input
              type="password"
              name="newPassword"
              onChange={(e) =>
                setUpdatedData((prv) => {
                  return {
                    ...prv,
                    newPassword: e.target.value,
                  };
                })
              }
              className="outline-none pl-1.5 bg-gray-100 rounded-sm"
            />
          </div>
          <div className="text-lg py-1">
            <span className="font-semibold pl-2">Re-type Password:&nbsp;</span>
            <input
              type="password"
              name="reTypePassword"
              onChange={(e) =>
                setUpdatedData((prv) => {
                  return {
                    ...prv,
                    reTypePassword: e.target.value,
                  };
                })
              }
              className="outline-none pl-1.5 bg-gray-100 rounded-sm"
            />
          </div>

          <Button
            variant="secondary"
            className="capitalize mt-5 disabled:bg-opacity-50 disabled:cursor-not-allowed"
            onClick={handleChangePassword}
            disabled={disabled}
          >
            Change Password
          </Button>
        </div>
      </Container>
    </main>
  );
};

export default ChangePassword;
