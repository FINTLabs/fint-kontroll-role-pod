import React, { useState, useContext } from "react";
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
import {UnitContext} from "../../context/unitContext";

//FILE HAS TO BE JAVASCRIPT
// due to the way we build the unit tree

const DialogUnit = ({ open, onClose }) => {
    const [selected, setSelected] = useState([]);

    const {unitTree} = useContext(UnitContext);

    const customDialogStyle = {
        width: '600px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const handleClear = () => {
        setSelected([]);
    };

    const handleSave = () => {
        onClose(selected);
    };

    const renderTree = (nodes) => {

        return (
            <TreeItem
                key={nodes.id}
                nodeId={nodes.organisationUnitId}
                // label={nodes.name}
                label={
                    <React.Fragment>
                        <Checkbox
                            checked={selected.indexOf(nodes.organisationUnitId) !== -1}
                            onClick={(event) => {
                                event.stopPropagation();
                                const newSelected = selected.includes(nodes.organisationUnitId)
                                    ? selected.filter((id) => id !== nodes.organisationUnitId)
                                    : [...selected, nodes.organisationUnitId];
                                setSelected(newSelected);
                            }}
                        />
                        {nodes.name}
                    </React.Fragment>
                }
            >
                {Array.isArray(nodes.childrenRef)
                    ? nodes.childrenRef.map((nodeId) => {
                        const node = unitTree.orgUnits.find(
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
        <Dialog open={open} onClose={handleSave} sx={{ '& .MuiPaper-root': customDialogStyle }} id={'unitsSelectDialog'}>
            <DialogTitle>Select items </DialogTitle>
            <DialogContent>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    {unitTree?.orgUnits?.map((node) => {
                        if (node.parentRef !== node.organisationUnitId) {
                            return null;
                        }
                        return renderTree(node);
                    })}
                </TreeView>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClear} id={'unitDialogCancel'}>Clear All</Button>
                <Button onClick={handleSave} id={'unitDialogSave'}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogUnit;
