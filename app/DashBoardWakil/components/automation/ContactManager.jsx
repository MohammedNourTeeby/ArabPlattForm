// components/Dashboard/ContactManager.jsx
"use client"

import { useAutomationStore } from "./useAutomationStore";

export const ContactManager = () => {
  const { contacts } = useAutomationStore();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الهاتف</th>
            <th>التصنيف</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};