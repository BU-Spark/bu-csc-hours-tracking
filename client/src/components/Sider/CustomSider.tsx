"use client";
import React from "react";
import { Layout, Menu, MenuProps, Typography } from "antd";
import "./CustomSider.css"; 
import { useRouter } from 'next/navigation';
const { Sider } = Layout;
import Pfp from "../Pfp";
import { useSession } from "next-auth/react";

const CustomSider: React.FC = () => {
  const router = useRouter();
  const {data: session, status} = useSession();
  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] =
    session?.user.role == "USER"
      ? [
          // {
          //   key: "dashboard",
          //   label: "Dashboard",
          //   onClick: () => router.push("/"),
          // },
          {
            key: "my_hours",
            label: "My Hours",
            onClick: () => router.push("/user/my-hours"),
          },
          {
            key: "events",
            label: "Events",
            onClick: () => router.push("/user/events"),
          },
          {
            key: "forms",
            label: "Forms",
            onClick: () => router.push("/user/forms"),
          },
          {
            key: "settings",
            label: "Settings",
            disabled: true,
          },
        ]
      : session?.user.role === "ADMIN"
      ? [
          {
            key: "student_hours",
            label: "Student Hours",
            onClick: () => router.push("/admin/student-hours"),
          },
          {
            key: "events",
            label: "Events",
            onClick: () => router.push("/admin/events"),
            disabled: true,
          },
          {
            key: "forms",
            label: "Forms",
            onClick: () => router.push("/admin/forms"),
            disabled: true,
          },
        ]
      : [];

  return session?.user?.image ? (
    <Sider
      style={{
        background: "white",
        marginTop: "0em",
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        zIndex: 2,
        left: 0,
        top: 0,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="sider-content">
        <div className="sider-profile">
          <Pfp dimension={"6em"} sessionImage={session.user.image} />
          <div className="sider-profile-details">
            <Typography.Text strong className="user-name">
              {session?.user.name}
            </Typography.Text>
            <br />
            <Typography.Text>{session?.user.email}</Typography.Text>
          </div>
          <Menu
            style={{
              marginTop: "3em",
              fontSize: "large",
              width: "100%",
            }}
            items={items}
            defaultSelectedKeys={["dashboard"]}
            className="custom-menu"
            mode="inline"
          />
        </div>
      </div>
    </Sider>
  ) : (
    <></>
  );
};

export default CustomSider;
