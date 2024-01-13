import React, { useState } from 'react';

interface Friends {
  id: number;
  name: string;
  image: string;
  balance: number;
}

const initialFriends: Friends[] = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

// !App component
export default function App(): React.JSX.Element {
  const [friends, setFriends] = useState<Friends[]>(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<Friends | null>(null);

  function handleAddShowFriend() {
    setShowAddFriend((s) => !s);
  }

  function handleAddFriend(friend: Friends) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend: Friends) {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleAddShowFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

type FriendsListProps = {
  friends: Friends[];
  selectedFriend: Friends | null;
  onSelection: (friend: Friends) => void;
};

// !Friends List component
function FriendsList({
  friends,
  selectedFriend,
  onSelection,
}: FriendsListProps): React.JSX.Element {
  return (
    <ul>
      {friends.map((friend) => {
        return (
          <Friend
            key={friend.id}
            {...friend}
            selectedFriend={selectedFriend}
            onSelection={onSelection}
          />
        );
      })}
    </ul>
  );
}

type FriendProps = {
  id: number;
  name: string;
  image: string;
  balance: number;
  selectedFriend: Friends | null;
  onSelection: (friend: Friends) => void;
};

// !Friend component
function Friend({
  id,
  name,
  image,
  balance,
  selectedFriend,
  onSelection,
}: FriendProps): React.JSX.Element {
  const friend = { id, name, image, balance };
  const isSelected = selectedFriend?.id === id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={image} alt={name} />
      <h3>{name}</h3>

      {balance < 0 && (
        <p className="red">
          You owe {name} {Math.abs(balance)}₹
        </p>
      )}

      {balance > 0 && (
        <p className="green">
          {name} owes you {balance}₹
        </p>
      )}

      {balance === 0 && <p>You and {name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

type FromAddFriendProps = {
  onAddFriend: (friend: Friends) => void;
};

// !Form Add Friend component
function FormAddFriend({ onAddFriend }: FromAddFriendProps): React.JSX.Element {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>(
    'https://i.pravatar.cc/48?u=499476'
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !image) return;

    const id: number = crypto.getRandomValues(new Uint32Array(1))[0];

    const newFriend = {
      id,
      name,
      image: `${image}?random=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48?u=499476');
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤗Friend</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📷Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

type FormSplitBillProps = {
  selectedFriend: Friends;
};

// !Form Split Bill component
function FormSplitBill({
  selectedFriend,
}: FormSplitBillProps): React.JSX.Element {
  const { id, name, image, balance } = selectedFriend;

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {name}</h2>

      <label>💰Bill value</label>
      <input type="number" />

      <label>🧍Your expense</label>
      <input type="number" />

      <label>🧑‍🤝‍🧑{name}'s expense</label>
      <input type="number" disabled />

      <label>🤑Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

// !Button component
function Button({ children, onClick }: ButtonProps): React.JSX.Element {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
