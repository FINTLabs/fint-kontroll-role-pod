import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button, Checkbox,
} from "@mui/material";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import data from "../common/testData"



const DialogUnit = ({ open, onClose }) => {
    const [selected, setSelected] = useState([]);

    const customDialogStyle = {
        width: '600px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const handleClose = () => {
        onClose(selected);
    };

    const handleSave = () => {
        console.log('Selected node(s):', selected);
    };


    // const handleCheckboxChange = (event, nodeId) => {
    //     if (event.target.checked) {
    //         setSelected([...selected, nodeId]);
    //     } else {
    //         setSelected(selected.filter((id) => id !== nodeId));
    //     }
    //     console.log('Selected node(s):', selected);
    // };

    const renderTree = (nodes) => {
        // if (nodes.parentRef !== parentId) {
        //     return null;
        // }

        return (
            <TreeItem
                key={nodes.id}
                nodeId={nodes.organisationUnitId}
                // label={nodes.name}
                label={
                    <React.Fragment>
                        <Checkbox
                            checked={selected.indexOf(nodes.id) !== -1}
                            onClick={(event) => {
                                event.stopPropagation();
                                const newSelected = selected.includes(nodes.id)
                                    ? selected.filter((id) => id !== nodes.id)
                                    : [...selected, nodes.id];
                                setSelected(newSelected);
                            }}
                        />
                        {nodes.name}
                    </React.Fragment>
                }
            >
                {Array.isArray(nodes.childrenRef)
                    ? nodes.childrenRef.map((nodeId) => {
                        const node = data.orgUnits.find(
                            (n) => n.organisationUnitId === nodeId
                        );
                        if (node) {
                            return renderTree(node, nodes.organisationUnitId);
                        }
                        return null;
                    })
                    : null}
            </TreeItem>
        );
    };

    return (
        <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': customDialogStyle }}>
            <DialogTitle>Select items</DialogTitle>
            <DialogContent>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    // onNodeSelect={handleNodeSelect}
                    // multiSelect
                    // sx={{ height: 216, flexGrow: 1, maxWidth: 800, overflowY: 'auto' }}
                >
                    {/*{data.orgUnits.map((orgUnit) => renderTree(orgUnit))}*/}
                    {/*{renderTree(data[0])}*/}
                    {data.orgUnits.map((node) => {
                        if (node.parentRef !== node.organisationUnitId) {
                            return null;
                        }
                        return renderTree(node);
                    })}
                </TreeView>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogUnit;
