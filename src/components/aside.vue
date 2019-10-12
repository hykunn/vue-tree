<template>
    <div class="tree">
                <span><el-button type="primary" icon="el-icon-edit" circle @click="addNewPage" size="mini" style="margin:10px"></el-button>添加新页面
                </span>
        <el-input prefix-icon="el-icon-search"
                  size="mini"
                  placeholder="搜索页面"
                  v-model="filterText">
        </el-input>
        <el-scrollbar>
            <el-tree
                    class="elTree"
                    :data="data"
                    node-key="id"
                    @node-click="handleNodeClick"
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="tree"
                    @node-drag-start="handleDragStart"
                    @node-drag-enter="handleDragEnter"
                    @node-drag-leave="handleDragLeave"
                    @node-drag-over="handleDragOver"
                    @node-drag-end="handleDragEnd"
                    @node-drop="handleDrop"
                    draggable
                    :allow-drop="allowDrop"
                    :allow-drag="allowDrag"
                    :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span v-if="editStatus!==data.$treeNodeId">{{ node.label }}</span>
                <span v-if="editStatus===data.$treeNodeId" :key="data.$treeNodeId">
                <el-input size="small" v-model="editInput" placeholder="请输入内容" class="editInput"></el-input>
                <el-button
                        type="text"
                        size="mini"
                        @click="() => editConfirm(data)">
                    确定
                  </el-button>
                </span>
                <el-dropdown v-if="editStatus!==data.$treeNodeId" class="elDropdown">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <el-button
                              type="text"
                              size="mini"
                              @click="() => edit(data)">
                    编辑
                  </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-button
                            type="text"
                            size="mini"
                            @click="()=>throttleAppend(data)">
                    添加
                  </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => remove(node, data)">
                    删除
                  </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </span>
            </el-tree>
        </el-scrollbar>
    </div>
</template>

<script>
    import {throttle} from '../libs/tools'

    let id = 1000;
    export default {
        name: 'Aside',
        data() {
            return {
                filterText: '',
                currentDateNode: null,
                editStatus: 0,
                editInput: '',
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2',
                        children: [{
                            id: 11,
                            label: '三级 3-2-1'
                        }, {
                            id: 12,
                            label: '三级 3-2-2'
                        }, {
                            id: 13,
                            label: '三级 3-2-3'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            handleDragStart(node, ev) {
                // eslint-disable-next-line no-console
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                // eslint-disable-next-line no-console
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                // eslint-disable-next-line no-console
                console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                // eslint-disable-next-line no-console
                console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                // eslint-disable-next-line no-console
                console.log('tree drag end: ', dropNode && dropNode.label, dropType)
                // eslint-disable-next-line no-console
                console.log('data的结果: ', this.data);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                // eslint-disable-next-line no-console
                console.log('tree drop: ', dropNode.label, dropType);
            },
            allowDrop(draggingNode, dropNode, type) {
                if (dropNode.data.label === '二级 3-1') {
                    return type !== 'inner';
                } else {
                    return true;
                }
            },
            allowDrag(draggingNode) {
                return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            addNewPage() {
              console.log(this.data)
              if(this.data.length===0){
                this.data=[{
                  id: 1,
                  label: '一级 1'
                }]
              }else{
                  throttle(this.append(this.currentDateNode),1000)
              }
            },
            append(data) {
                const newChild = {id: id++, label: '新建页面' + (id - 1000), children: []};
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
                this.$nextTick(() => {
                    this.edit(newChild);
                })
            },
            edit(data) {
                this.editInput = data.label
                this.editStatus = data.$treeNodeId
                console.log(data)
            },
            editConfirm(data) {
                data.label = this.editInput
                this.editStatus = 0
            },
            remove(node, data) {
                this.$confirm('此操作将永久删除该页面以及下面所有的子页面, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === data.id);
                    children.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleNodeClick(data) {
                this.currentDateNode = data
            },
            throttleAppend(data) {
                throttle(this.append(data), 1000)
            }
        }
    }
</script>
<style>
    .elTree {
        margin-top: 18px;
        height: calc(100vh - 140px);
    }
    .editInput{
        width: 100px;
    }
    .editInput .el-input__inner {
        border: 0 none;
        border-bottom: 1px solid #ccc;
        border-radius: 0px;
        line-height: 18px;
        height: 18px;
        width: 100px;
    }
    /*.searchTree{*/
    /*    position: relative;*/
    /*    left: 0;*/
    /*}*/
    /*.el-tree-node > .el-tree-node__children {*/
    /*    overflow: visible !important;*/
    /*}*/
    .elDropdown{
        position: absolute;
        right: 10px;
    }
    span{
        font-size: 14px;
    }
</style>
