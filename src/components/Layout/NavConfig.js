// ----------------------------------------------------------------------

import Iconify from "assets/theme/components/icon/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Quản lí tài khoản",
    path: "/admin/account",
    icon: getIcon("eva:person-fill"),
  },
  // {
  //   title: "Lịch sử hoạt động",
  //   path: "/admin/history",
  //   icon: getIcon("eva:file-text-fill"),
  // },
  {
    title: "Quản lý chiến dịch",
    path: "/admin/manager-campaign",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  // {
  //   title: "Kết quả",
  //   icon: getIcon("tabler:building-warehouse"),
  //   children: [
  //     {
  //       title: "History",
  //       subPath: "/dashboard/account",
  //       icon: getIcon("eva:cube-fill"),
  //     },
  //   ],
  // },
];

const navConfigUser = [
  {
    title: "Tất cả chiến dịch",
    path: "/user/campaign",
    icon: getIcon("ic:baseline-campaign"),
  },
  {
    title: "Chiến dịch",
    icon: getIcon("eva:pie-chart-2-fill"),
    children: [
      {
        title: "Quản lý chiến dịch",
        icon: getIcon("eva:settings-2-outline"),
        subItems: [
          {
            title: "Chiến dịch của bản thân",
            subPath: "/user/campaignOwner",
            icons: getIcon("material-symbols:campaign-outline-sharp"),
          },
        ],
      },
    ],
  },
  {
    title: "Đánh giá",
    path: "/user/feedback",
    icon: getIcon("fluent:person-feedback-16-filled"),
  },
  {
    title: "Lịch sử hoạt động",
    path: "/user/history",
    icon: getIcon("eva:file-text-fill"),
    // s
  },
  {
    title: "Top 10",
    path: "/user/result/6097a517-11ad-4105-b26a-0e93bea2cb43",
    icon: getIcon("solar:ranking-linear"),
  },

  // {
  //   title: "Top 10",
  //   path: "user/test",
  //   icon: getIcon("eva:file-text-fill"),
  // },
];

const navConfig1 = [
  {
    title: "Lịch sử hoạt động",
    path: "/user/history",
    icon: getIcon("eva:file-text-fill"),
    // s
  },

  {
    title: "Chiến dịch của bản thân",
    path: "/user/campaignOwner",
    icon: getIcon("material-symbols:campaign-outline-sharp"),
  },

  {
    title: "Hồ sơ ứng cử viên",
    path: "/user/profilecandidate",
    icon: getIcon("eva:person-fill"),
  },

  {
    title: "Biểu mẫu",
    path: "/user/form",
    icon: getIcon("clarity:form-line"),
  },
  {
    title: "Đánh giá",
    path: "/user/feedback",
    icon: getIcon("fluent:person-feedback-16-filled"),
  },
];

const navConfig2 = [
  {
    title: "Chiến dịch",
    icon: getIcon("eva:pie-chart-2-fill"),
    children: [
      {
        title: "Tất cả chiến dịch",
        path: "/user/campaign",
        icon: getIcon("ic:baseline-campaign"),
      },
      {
        title: "Quản lý chiến dịch",
        icon: getIcon("eva:settings-2-outline"),
        subItems: [
          {
            title: "Chiến dịch của bản thân",
            subPath: "/user/campaignOwner",
            icons: getIcon("material-symbols:campaign-outline-sharp"),
          },
          {
            title: "Đánh giá",
            subPath: "/user/feedback",
            icons: getIcon("fluent:person-feedback-16-filled"),
          },
        ],
      },
    ],
  },
  {
    title: "Biểu mẫu",
    path: "/user/form",
    icon: getIcon("clarity:form-line"),
  },
];

const navConfig3 = [
  {
    title: "Chiến dịch",
    icon: getIcon("eva:pie-chart-2-fill"),
    children: [
      {
        title: "Tất cả chiến dịch",
        path: "/user/campaign",
        icon: getIcon("ic:baseline-campaign"),
      },
      {
        title: "Quản lý chiến dịch",
        icon: getIcon("eva:settings-2-outline"),
        subItems: [
          {
            title: "Chiến dịch của bản thân",
            subPath: "/user/campaignOwner",
            icons: getIcon("material-symbols:campaign-outline-sharp"),
          },
          {
            title: "Đánh giá",
            subPath: "/user/feedback",
            icons: getIcon("fluent:person-feedback-16-filled"),
          },
        ],
      },
    ],
  },
  {
    title: "Lịch sử hoạt động",
    path: "/user/history",
    icon: getIcon("eva:file-text-fill"),
    // s
  },
  {
    title: "Biểu mẫu",
    path: "/user/form",
    icon: getIcon("clarity:form-line"),
  },
];

const navConfig4 = [
  {
    title: "Hồ sơ ứng cử viên",
    path: "/user/campaignjoin",
    icon: getIcon("eva:person-fill"),
  },

  {
    title: "Lịch sử hoạt động",
    path: "/user/history",
    icon: getIcon("eva:file-text-fill"),
    // s
  },
];

const navConfig5 = [
  {
    title: "Lịch sử hoạt động",
    path: "/user/history",
    icon: getIcon("eva:file-text-fill"),
    // s
  },

  {
    title: "Hồ sơ ứng cử viên",
    path: "/user/profilecandidate",
    icon: getIcon("eva:person-fill"),
  },
];

const navConfig6 = [
  {
    title: "Tất cả chương trình",
    path: "/user/campaign",
    icon: getIcon("ic:baseline-campaign"),
  },

  // {
  //   title: "Top 10",
  //   path: "/user/top10",
  //   icon: getIcon("icon-park:list-top"),
  // },
  {
    title: "Lịch sử hoạt động",
    path: "/user/history",
    icon: getIcon("eva:file-text-fill"),
    // s
  },

  {
    title: "Lịch sử top 10",
    icon: getIcon("solar:ranking-bold-duotone"),
    subItems: [
      {
        title: "Năm 2023",
        subPath: "/user/sildetop/10",
        icons: getIcon("solar:ranking-outline"),
      },
      // {
      //   title: "Năm 2024 (Đang diễn ra)",
      //   subPath: "/user/null",
      //   icons: getIcon("solar:ranking-outline"),
      // },
    ],
  },

  // {
  //   title: "Top 10 in 2023",
  //   path: "/user/sildetop/10",
  //   icon: getIcon("eva:person-fill"),
  // },
  // {
  //   title: "Top 10",
  //   path: "/user/top10",
  //   icon: getIcon("eva:file-text-fill"),
  // },
];

const exportedObject = {
  navConfig,
  navConfigUser,
  navConfig1,
  navConfig2,
  navConfig3,
  navConfig4,
  navConfig5,
  navConfig6,
};
export default exportedObject;
