import { EventData, PreparedValues } from "../contexts/calendar-context";
import endpoints from "./endpoints";

export const getCurrentMonthEvents = async (
  start: string,
  last: string
): Promise<EventData[] | undefined> => {
  try {
    const response = await fetch(
      endpoints.getCurrentEvents + `?startTime=${start}&lastTime=${last}`
    );
    if (!response.ok || response.status !== 200) {
      throw new Error("Failed to fetch data!");
    }
    return await response.json();
  } catch (err) {
    let errorMessage: string = "Failed to get data!";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error(errorMessage);
  }
};

export const createEvent = async (
  values: PreparedValues,
  eventDate: string
): Promise<EventData | undefined> => {
  try {
    const response = await fetch(endpoints.createEvent, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        date: eventDate,
      }),
    });
    if (!response.ok || response.status !== 201) {
      throw new Error("Failed to save data!");
    }
    return await response.json();
  } catch (err) {
    let errorMessage: string = "Failed to save data!";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error(errorMessage);
  }
};

export const deleteEvent = async (eventId: string, date: string) => {
  try {
    const response = await fetch(
      endpoints.deleteEvent + `/${date}/${eventId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok || response.status !== 200) {
      throw new Error("Failed to delete data!");
    }
    return await response.json();
  } catch (err) {
    let errorMessage: string = "Failed to delete data!";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error(errorMessage);
  }
};

export const updateEvent = async (
  updatedEvent: EventData
): Promise<EventData | undefined> => {
  try {
    const response = await fetch(endpoints.updateEvent, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    });
    if (!response.ok || response.status !== 201) {
      throw new Error("Failed to update data!");
    }
    return await response.json();
  } catch (err) {
    let errorMessage: string = "Failed to update data!";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error(errorMessage);
  }
};

export const updateDragDropInOneDay = async (updatedEvents: EventData[]) => {
  try {
    const response = await fetch(endpoints.updateDragDropInOneDay, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvents),
    });
    if (!response.ok || response.status !== 201) {
      throw new Error("Failed to update data!");
    }
    return await response.json();
  } catch (err) {
    let errorMessage: string = "Failed to update data!";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error(errorMessage);
  }
};

export const updateDragDropDiffDays = async (updatedData: {
  draggedDay: EventData[];
  droppedDay: EventData[];
}) => {
  try {
    const response = await fetch(endpoints.updateDragDropDiffDays, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok || response.status !== 201) {
      throw new Error("Failed to update data!");
    }
    return await response.json();
  } catch (err) {
    let errorMessage: string = "Failed to update data!";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error(errorMessage);
  }
};

export const getWorldHolidays = async () => {
  try {
    const response = await fetch(endpoints.getWorldHolidays);
    if (!response.ok || response.status !== 200) {
      throw new Error("Failed to fetch data!");
    }
    return await response.json();
  } catch (err) {
    let errorMessage: string = "Failed to fetch data!";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error(errorMessage);
  }
};
