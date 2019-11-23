import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import axios from 'axios';
import {auth} from "../auth";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#5BAADC',
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});


class TableLocalidades extends React.Component {
    constructor({ ativarModoEdicao }) {
        super({ ativarModoEdicao });
        this.state = {
            linhas: []
        };
    }

    componentWillMount(){
      this.pegarLocalidades();
    }

    pegarLocalidades(){
        try{
          axios.post('http://74.117.156.74:5012/Localidade/get',{},auth.config).then(response => {
            this.setState({linhas:response.data})
          })
        }catch(err){
          console.log(err);
        }
    }

    render() {
        const { classes } = this.props;

        return (
                <Paper className={classes.root}>
                    {
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell align="center">Nome</CustomTableCell>
                                    <CustomTableCell align="center">Descrição</CustomTableCell>
                                    <CustomTableCell align="center">Imagem</CustomTableCell>
                                    <CustomTableCell align="center">Horário de Funcionamento</CustomTableCell>
                                    <CustomTableCell align="center">Status</CustomTableCell>
                                    <CustomTableCell align="center">Editar</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.linhas.map(row => (
                                    <TableRow className={classes.row} key={row.id}>
                                        <CustomTableCell align="center">{row.nome}</CustomTableCell>
                                        <CustomTableCell align="center">{row.descricao}</CustomTableCell>
                                        <CustomTableCell align="center">{row.imagem}</CustomTableCell>
                                        <CustomTableCell align="center">{row.horario_funcionamento}</CustomTableCell>
                                        <CustomTableCell align="center">{row.status}</CustomTableCell>
                                        <CustomTableCell align="center">
                                            <NavLink to={{
                                                    pathname:"/localidades/editar", 
                                                        localidadesProps:{
                                                            nome: "Edição de Localidade", 
                                                            descricao: "Altere os campos desejados e clique em concluir para finalizar.",
                                                            id: row.id
                                                        }}}>
                                                <FontAwesomeIcon icon={faEdit} size="lg" className="App-icon" />
                                            </NavLink>
                                        </CustomTableCell>
                                    </TableRow>
                                )) 
                                }
                            </TableBody>
                        </Table>

                    }

                </Paper>
            
        );
    }
}

TableLocalidades.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableLocalidades);