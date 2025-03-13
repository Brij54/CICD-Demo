import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

export type ResourceMetaData = {
  resource: string;
  fieldValues: any[];
};

const Edit = () => {
  const location = useLocation();
  const { id, editedData, currUrl, resName, apiUrl, metadataUrl, BaseUrl } = location.state;

  const [editedRecord, setEditedRecord] = useState<any>(editedData || {});
  const [fields, setFields] = useState<any[]>([]);
  const [foreignKeyData, setForeignKeyData] = useState<Record<string, any[]>>({});
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState<boolean>(false);
  const regex = /^(g_|archived|extra_data)/;

  const fetchForeignData = useCallback(async (foreignResource: string, fieldName: string, foreignField: string) => {
    try {
      const params = new URLSearchParams();
      const ssid: any = sessionStorage.getItem("key");
      params.append("queryId", "GET_ALL");
      params.append("session_id", ssid);

      const response = await fetch(
        `${BaseUrl}/${foreignResource.toLowerCase()}?${params.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setForeignKeyData((prev) => ({
          ...prev,
          [foreignResource]: data.resource,
        }));
      } else {
        console.error(`Error fetching foreign data for ${fieldName}:`, response.status);
      }
    } catch (error) {
      console.error(`Error fetching foreign data for ${fieldName}:`, error);
    }
  }, [BaseUrl]);

  useEffect(() => {
    const fetchResMetaData = async () => {
      const fetchedResources = new Set();
      try {
        const response = await fetch(metadataUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const metaData = await response.json();
          setFields(metaData[0]?.fieldValues || []);

          const foreignFields = metaData[0]?.fieldValues.filter((field: any) => field.foreign);
          for (const field of foreignFields) {
            if (!fetchedResources.has(field.foreign)) {
              fetchedResources.add(field.foreign);
              await fetchForeignData(field.foreign, field.name, field.foreign_field);
            }
          }
        } else {
          console.error("Failed to fetch metadata:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };
    fetchResMetaData();
  }, [metadataUrl, fetchForeignData]);

  const handleEdit = (id: any, field: string, value: string) => {
    setEditedRecord((prevData: any) => ({
      ...prevData,
      [id]: {
        ...(prevData[id] || {}),
        [field]: value,
      },
    }));
  };

  const handleSearchChange = (fieldName: string, value: string) => {
    setSearchQueries((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleUpdate = async (id: any) => {
    if (!editedRecord[id]) return;

    const updatedRecord = {
      id,
      ...editedRecord[id],
    };

    const base64Encoded = btoa(JSON.stringify(updatedRecord));
    const params = new URLSearchParams();
    const ssid: any = sessionStorage.getItem("key");
    params.append("resource", base64Encoded);
    params.append("action", "MODIFY");
    params.append("session_id", ssid);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (response.ok) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        window.location.assign(currUrl);
      } else {
        console.error("Error updating record:", response.statusText);
      }
    } catch (error) {
      console.error("Error in handleUpdate:", error);
    }
  };

  return (
    <div className="container mt-4">
      {fields.map((field, index) => {
        if (field.name !== "id" && !regex.test(field.name)) {
          return (
            <div key={index} className="form-group">
              <label>{field.name}</label>
              <input
                type="text"
                className="form-control"
                value={editedRecord[id]?.[field.name] || ""}
                onChange={(e) => handleEdit(id, field.name, e.target.value)}
              />
            </div>
          );
        }
        return null;
      })}
      <button onClick={() => handleUpdate(id)} className="btn btn-success mt-3">
        Save
      </button>

      {showToast && (
        <div className="toast-container position-fixed top-20 start-50 translate-middle p-3" style={{ zIndex: 1550 }}>
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Success</strong>
              <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
            </div>
            <div className="toast-body text-success text-center">
              Updated successfully!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;