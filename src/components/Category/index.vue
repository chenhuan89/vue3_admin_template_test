<template>
    <el-card>
        <!-- <span>请选择商品信息</span>
            <el-cascader v-model="value" :options="options" @change="handleChange" /> -->
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select>
                    <el-option label="123"></el-option>
                    <el-option label="457"></el-option>
                    <el-option label="888"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select>
                    <el-option label="123"></el-option>
                    <el-option label="457"></el-option>
                    <el-option label="888"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select>
                    <el-option label="123"></el-option>
                    <el-option label="457"></el-option>
                    <el-option label="888"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
