import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './config/ThemeConfig';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './context/user_context';
import { OrderProvider } from './context/order_context';
import { ProductProvider } from './context/product_context';
import { ProductAssignProvider } from './context/productAssign_context';
import { KitchenProvider } from './context/kitchen_context';
import { TruckProvider } from './context/truck_context';
import { SchoolProvider } from './context/school_context';
import { ContainerProvider } from './context/container_context';
import { ContainerAssignProvider } from './context/containerAssign_context';
import { TruckAssignProvider } from './context/truckAssign_context';
import { AdminProvider } from './context/admin_context';

ReactDOM.render(
  <UserProvider>
    <AdminProvider>
      <OrderProvider>
        <ProductProvider>
          <KitchenProvider>
            <TruckProvider>
              <ContainerProvider>
                <SchoolProvider>
                  <ContainerAssignProvider>
                    <TruckAssignProvider>
                      <ProductAssignProvider>
                        <ChakraProvider theme={theme}>
                          <App />
                        </ChakraProvider>
                      </ProductAssignProvider>
                    </TruckAssignProvider>
                  </ContainerAssignProvider>
                </SchoolProvider>
              </ContainerProvider>
            </TruckProvider>
          </KitchenProvider>
        </ProductProvider>
      </OrderProvider>
    </AdminProvider>
  </UserProvider>,
  document.getElementById('root')
);
