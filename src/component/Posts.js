import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataGrid, koKR } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function Posts() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      navigate("/");
    }

    (async () => {
      const userRepository = await getUserRepository();
      const files = await getUserRepositoryFiles(userRepository);
      console.log(files);
      setFiles(files);
    })();
  }, [navigate]);

  async function getUserRepository() {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get("/user/repo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }

  async function getUserRepositoryFiles(userRepository) {
    const accessToken = localStorage.getItem("accessToken");
    const owner = userRepository["owner"]["login"];
    const repo = userRepository["name"];
    const path = "/_posts";

    const response = await axios.get(`/files`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        owner: owner,
        repo: repo,
        path: path,
      },
    });

    return response.data;
  }

  function editPost(name) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      navigate("/");
    }

    navigate("/post", { state: { name: name } });
  }

  const columns = [
    {
      field: "name",
      headerName: "제목",
      width: 1000,
      headerAlign: "center",
      renderCell: (params) => (
        <Button onClick={editPost(params.row.name)}>{params.row.name}</Button>
      ),
    },
  ];

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} alignItems="center" justifyContent="center">
        <DataGrid
          getRowId={(row) => row.name}
          rows={files}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 30, 50]}
          localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
          checkboxSelection
        />
      </Grid>
    </Grid>
  );
}

export default Posts;
