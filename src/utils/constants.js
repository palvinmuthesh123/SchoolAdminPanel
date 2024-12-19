import React from 'react';
import {
  FaHome,
  FaProductHunt,
  FaShoppingCart,
  FaUserTie,
} from 'react-icons/fa';

export const LinkItems = [
  { name: 'Home', url: '/', icon: <FaHome /> },
  { name: 'Cookers', url: '/products', icon: <FaProductHunt /> },
  { name: 'Containers', url: '/containers', icon: <FaProductHunt /> },
  { name: 'Trucks', url: '/trucks', icon: <FaProductHunt /> },
  { name: 'Kitchen', url: '/kitchen', icon: <FaProductHunt /> },
  { name: 'Route', url: '/pathways', icon: <FaProductHunt /> },
  // { name: 'Cooker Assign', url: '/productassign', icon: <FaProductHunt /> },
  // { name: 'Container Assign', url: '/containerassign', icon: <FaProductHunt /> },
  // { name: 'Truck Assign', url: '/truckassign', icon: <FaProductHunt /> },
  { name: 'Schools', url: '/schools', icon: <FaProductHunt /> },
  { name: 'Orders', url: '/orders', icon: <FaShoppingCart /> },
  { name: 'Users', url: '/admins', icon: <FaUserTie /> },
];

export const orderStatusList = [
  { name: 'Reject', value: 'rejected' },
  { name: 'Processing', value: 'processing' },
  { name: 'Confirmed', value: 'confirmed' },
  { name: 'Shipped', value: 'shipped' },
  { name: 'Delivered', value: 'delivered' },
];

export const domain = process.env.REACT_APP_BACKEND_HOST;
export const auth_url = `${domain}/api/admin/auth`;
export const login_url = `${domain}/api/admin/login`;
export const register_url = `${domain}/api/admin/register`;
export const logout_url = `${domain}/api/admin/logout`;
export const orders_url = `${domain}/api/admin/orders`;
export const update_product_url = `${domain}/api/admin/product/`;
export const update_kitchen_url = `${domain}/api/kitchens/`;
export const update_truck_url = `${domain}/api/trucks/`;
export const update_school_url = `${domain}/api/schools/`;
export const update_container_url = `${domain}/api/containers/`;
export const update_pathway_url = `${domain}/api/pathways/`;
export const products_url = `${domain}/api/products/`;
export const kitchens_url = `${domain}/api/kitchens/`;
export const trucks_url = `${domain}/api/trucks/`;
export const containers_url = `${domain}/api/containers/`;
export const pathways_url = `${domain}/api/pathways/`;
export const schools_url = `${domain}/api/schools/`;
export const schools_urls = `${domain}/api/schools`;
export const admins_url = `${domain}/api/admin/users/`;
export const single_order_url = `${domain}/api/orders/`;
export const update_order_status = `${domain}/api/admin/order/`;
export const create_new_product = `${domain}/api/admin/product/new`;
export const create_new_kitchen = `${domain}/api/admin/kitchen/new`;
export const create_new_truck = `${domain}/api/admin/truck/new`;
export const create_new_school = `${domain}/api/admin/school/new`;
export const create_new_container = `${domain}/api/admin/container/new`;
export const create_new_pathway = `${domain}/api/admin/pathway/new`;
export const delete_review = `${domain}/api/admin/product/review/`;
export const get_truck_assign = `${domain}/api/assign/getassignTruck`;
export const get_cooker_assign = `${domain}/api/assign/getassignCooker`;
export const get_container_assign = `${domain}/api/assign/getassignContainer`;
export const delete_truck_assign = `${domain}/api/assign/deleteassignTruck/`;
export const delete_cooker_assign = `${domain}/api/assign/deleteassignCooker/`;
export const delete_container_assign = `${domain}/api/assign/deleteassignContainer/`;