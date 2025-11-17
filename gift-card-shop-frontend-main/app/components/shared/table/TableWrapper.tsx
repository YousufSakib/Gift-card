import React from 'react';
import { cn } from '~/lib/cn';

type Props = { children: React.ReactNode; className?: string };

export default function TableWrapper({ children, className }: Props) {
    return (
        <div className={cn('overflow-x-auto bg-surface-300 rounded-xl space-y-6 p-5', className)}>
            {children}
        </div>
    );
}

/***** Usage Of Table  ******/

// type User = {
//   id: number;
//   name: string;
//   address: string;
//   status: string;
//   product: {
//     image: string;
//     title: string;
//     subTitle: string;
//   };
//   image: string;
// };

// const columns: TableColumn[] = [
//   { key: "name", label: "name" },
//   { key: "address", label: "Address" },
//   { key: "product", label: "Product", type: "object" },
//   { key: "image", label: "ProductImage", type: "image" },
//   { key: "status", label: "Status" },
// ];

// const data = [
//   {
//     name: "Shifat",
//     address: "Dhaka",
//     status: "Shipped",
//     id: 1,
//     product: {
//       image: "/images/avatar.png",
//       title: "Product 1",
//       subTitle: `Quantity: 10`,
//     },
//     image: "/images/avatar.png",
//   },
//   {
//     name: "Shifat",
//     address: "Dhaka",
//     status: "Pending",
//     id: 2,
//     product: {
//       image: "/images/avatar.png",
//       title: "Product 1",
//       subTitle: `Quantity: 10`,
//     },
//     image: "/images/avatar.png",
//   },
//   {
//     name: "Shifat",
//     address: "Dhaka",
//     status: "Pending",
//     id: 3,
//     product: {
//       image: "/images/avatar.png",
//       title: "Product 1",
//       subTitle: `Quantity: 10`,
//     },
//     image: "/images/avatar.png",
//   },
//   {
//     name: "Shifat",
//     address: "Dhaka",
//     status: "Pending",
//     id: 4,
//     product: {
//       image: "/images/avatar.png",
//       title: "Product 1",
//       subTitle: `Quantity: 10`,
//     },
//     image: "/images/avatar.png",
//   },
//   {
//     name: "Shifat",
//     address: "Dhaka",
//     status: "Pending",
//     id: 5,
//     product: {
//       image: "/images/avatar.png",
//       title: "Product 1",
//       subTitle: `Quantity: 10`,
//     },
//     image: "/images/avatar.png",
//   },
// ];

// const actions: TableAction<User>[] = [
//   {
//     type: "delete",
//     onClick: (row) => {
//       console.log(row);
//     },
//   },
//   {
//     type: "edit",
//     onClick: (row) => {
//       console.log(row);
//     },
//   },
//   {
//     type: "view",
//     onClick: (row) => {
//       console.log(row);
//     },
//   },
//   {
//     type: "approve",
//     onClick: (row) => {
//       console.log(row);
//     },
//   },
//   {
//     type: "reject",
//     onClick: (row) => {
//       console.log(row);
//     },
//   },
// ];

// const pagination: TablePagination = {
//   hasNextPage: true,
//   hasPrevPage: true,
//   limit: 10,
//   nextPage: 6,
//   page: 5,
//   prevPage: 4,
//   serialNumberStartFrom: 41,
//   totalPages: 20,
//   totalProducts: 200,
//   onPageChange: (newPage: number) => {
//     console.log(newPage);
//   },
// };

// const statusOptions: TableStatsuOption[] = [
//     { label: "Pending", color: "bg-yellow-500" },
//     { label: "Shipped", color: "bg-blue-500" },
//     { label: "Completed", color: "bg-green-500" },
//     { label: "Canceled", color: "bg-red-500" },
//   ];

//       <TableWrapper>
//          <TableHeader title="Manage Order">Search</TableHeader>

//         <Table<User>
//           columns={columns}
//           data={data}
//           statusDropdown={true}
//           actions={actions}
//           statusOptions={statusOptions}
//         />

//         <TablePagination paginationOptions={pagination} />
//       </TableWrapper>
