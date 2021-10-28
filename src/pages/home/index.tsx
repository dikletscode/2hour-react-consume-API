import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Wrapper } from "../../components";
import { API } from "../../config/axios";

interface SingleItem {
  itemCompletionStatus: boolean;
  id: number;
  name: string | null;
}

interface Check {
  checklistCompletionStatus: boolean;
  id: number;
  items: SingleItem[];
  name: string | null;
}

interface CheckListTypes {
  data: Check[];
}

interface Items {
  checklistId: number;
  itemName: string;
}

const CheckList = () => {
  const [msgError, setMsgError] = useState("");
  const [data, setData] = useState<Check[]>([]);
  const [name, setName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [fetch, setFetch] = useState(false);
  const token = localStorage.getItem("credential");
  const getCheckList = async () => {
    try {
      let res = await API.get<CheckListTypes>("checklist", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(res.data.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setMsgError(error.response?.data.errorMessage);
      } else {
        setMsgError("terjadi error");
      }
    }
  };
  const addCheckList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postCheckList = async () => {
      try {
        await API.post<CheckListTypes>(
          "checklist",
          { name: name },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setFetch(true);
      } catch (error) {
        console.log(error);
      }
    };
    postCheckList();
  };

  const addItems = (checkId: number, itemName: string | null) => {
    const postItems = async () => {
      try {
        await API.post<Items>(
          "item",
          { checklistId: checkId, itemName: itemName },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setFetch(true);
      } catch (error) {
        console.log(error);
      }
    };
    postItems();
  };

  const deleteCheckList = (id: number) => {
    const remove = async () => {
      try {
        await API.delete("checklist/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setFetch(true);
      } catch (error) {
        console.log(error);
      }
    };
    remove();
  };
  const updateCheckList = (id: number) => {
    const remove = async () => {
      try {
        await API.put(
          "item/" + id,
          {
            itemCompletionStatus: true,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setFetch(true);
      } catch (error) {
        console.log(error);
      }
    };
    remove();
  };
  useEffect(() => {
    getCheckList();
    return () => setFetch(false);
  }, [token, fetch]);

  return (
    <>
      {openModal ? (
        <Wrapper close={() => setOpenModal(false)}>
          <form
            action=""
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            onSubmit={addCheckList}
          >
            <div className="pb-2 pt-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="name"
                className="block w-full p-4 text-lg rounded-sm "
              />
            </div>

            <div className="px-4 pb-2 pt-4">
              <button className="uppercase block w-full p-4 text-lg rounded-full bg-blue-400 hover:bg-indigo-600 focus:outline-none">
                add checklist
              </button>
            </div>
          </form>
        </Wrapper>
      ) : (
        <></>
      )}

      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-9/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Page Visits
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpenModal(true)}
                  >
                    Add Check
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      checklist Id
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Items
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {item.id}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {item.items ? (
                            item.items.map((itemChild, index) => {
                              return (
                                <>
                                  <div className="text-xl">
                                    <p>
                                      {index + 1}. is Complete:{" "}
                                      {itemChild.itemCompletionStatus.toString()}
                                      <br />
                                      name :{itemChild.name}
                                    </p>
                                  </div>
                                  <div className=" w-20 p-9 ">
                                    <button
                                      onClick={() =>
                                        updateCheckList(itemChild.id)
                                      }
                                    >
                                      change Status
                                    </button>
                                  </div>
                                  <div className=" w-20 p-9 ">
                                    <button
                                      onClick={() =>
                                        addItems(item.id, item.name)
                                      }
                                    >
                                      add item
                                    </button>
                                  </div>
                                </>
                              );
                            })
                          ) : (
                            <button
                              onClick={() => addItems(item.id, item.name)}
                            >
                              add item
                            </button>
                          )}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {item.name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          <button onClick={() => deleteCheckList(item.id)}>
                            delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CheckList;
