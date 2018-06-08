import * as React from 'react';
import CSSModules from 'react-css-modules';
import * as styles from './style.less';

import { Table, Button } from 'antd';
const ButtonGroup = Button.Group;

interface IProps {
  data: object[];
  columns: object[];
  onAdd?: () => void;
  onDelete?: () => void;
  onModify?: () => void;
}

type selectedRowKeys = number[];

interface IState {
  selectedRowKeys: selectedRowKeys;
  loading: boolean;
}

@CSSModules(styles)
export default class TableCURD extends React.Component<IProps, IState> {
  state = {
    selectedRowKeys: [],
    loading: false
  };

  handleCancel = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  }

  handleAdd = async () => {
  }

  handleDelete = async () => {

  }

  onSelectChange = (selectedRowKeys: selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { data, columns } = this.props;
    const { loading, selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className="curd-table">
        <div className="curd-table-header" >
          <div>
            <ButtonGroup>
              <Button
                type="primary"
                onClick={this.handleCancel}
                disabled={!hasSelected}
                loading={loading}
              >
                取消
              </Button>
              <Button
                type="primary"
                icon="reload"
              >
                刷新
              </Button>
            </ButtonGroup>

            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>

          <div className="curd-table-header-right">
            <ButtonGroup>
              <Button
                type="primary"
                icon="plus"
              >
                新增
              </Button>
              <Button type="primary" icon="edit" >
                修改
              </Button>
              <Button type="primary" icon="delete" >
                删除
              </Button>
            </ButtonGroup>
          </div>

          <div className="curd-table-search">
            搜索表单
          </div>
        </div>

        <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered={true} />
      </div>
    );
  }
}
