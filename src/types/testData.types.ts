export interface Credentials {
  username: string;
  password: string;
}

export interface TestCaseMeta {
  /** Unique test case id, e.g. TC-LOGIN-001 */
  id: string;
  description: string;
}

export interface ValidLoginData extends TestCaseMeta, Credentials {}

export interface InvalidLoginData extends TestCaseMeta, Credentials {
  expectedError: string;
}

export interface UsersData {
  validUsers: ValidLoginData[];
  invalidUsers: InvalidLoginData[];
}

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface CartScenario extends TestCaseMeta {
  products: string[];
}

export interface CheckoutScenario extends TestCaseMeta {
  products: string[];
  customer: CheckoutCustomer;
  expectedConfirmation: string;
}

export interface ProductsData {
  cartScenarios: CartScenario[];
  checkoutScenarios: CheckoutScenario[];
}
