#!/bin/bash

# 目标目录
target_dir="lib"

# 统计总行数的变量
total_lines=0

# 遍历目标目录下的所有 JS 文件
for file in $(find "$target_dir" -name "*.js"); do
  # 统计当前文件的行数
  lines=$(wc -l < "$file")
  # 累加到总行数
  ((total_lines += lines))
done

# 打印总行数
echo "总行数: $total_lines"
