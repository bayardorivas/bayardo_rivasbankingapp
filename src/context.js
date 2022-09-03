import { useState, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialValue = {
    activeUser: null,

    users: [
      {
        name: "Carlos Vasquez",
        email: "carlos@gmail.com",
        secret: "carlos22",
        balance: 100,
        transactions: [
          {
            amount: 100,
            date: new Date(),
            type: "DEPOSIT",
          },
        ],
      },
      {
        name: "Bayardo Rivas",
        email: "bayardo@gmail.com",
        secret: "bayardo22",
        balance: 100,
        transactions: [
          {
            amount: 100,
            date: new Date(),
            type: "DEPOSIT",
          },
        ],
      },
    ],
  };

  const [auth, setAuth] = useState(initialValue);

  const setUser = (user) => {
    setAuth({ ...auth, activeUser: user });
  };

  const addTransaction = (transaction) => {
    const currentUser = auth.users.find(
      (user) => user.email === auth.activeUser.email
    );
    currentUser.transactions.push(transaction);

    if (transaction.type === "DEPOSIT") {
      currentUser.balance += transaction.amount;
    } else {
      currentUser.balance -= transaction.amount;
    }

    const users = [
      ...auth.users.filter((user) => user.email !== currentUser.email),
      currentUser,
    ];
    setAuth({ ...auth, users });
    setUser(currentUser);
  };

  return (
    <UserContext.Provider value={{ auth, setUser, addTransaction }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
